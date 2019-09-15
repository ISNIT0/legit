import * as React from 'react';
import './Router.css'

interface RouterProps {
    initRoutes: Route[],
    routes: {
        [route: string]: {
            component: React.ComponentClass<any, any>,
            prefetch?: (data?: any) => Promise<any>,
        }
    },
    props?: any
}

export interface Route {
    key: string,
    data?: any
}

interface RouterState {
    routeStack: Route[]
    routeIndex: number
    isAnimating: boolean
}

export class Router extends React.Component<RouterProps, RouterState> {
    constructor(props: RouterProps, b: any) {
        super(props, b);
        const initRoutes = props.initRoutes.filter(a => a)
        this.state = {
            routeStack: initRoutes,
            routeIndex: initRoutes.length - 1,
            isAnimating: true
        };
    }

    render() {
        const { isAnimating } = this.state
        if (!isAnimating) {
            setTimeout(() => {
                this.setState({
                    isAnimating: !isAnimating
                })
            })
        }
        return <div className='router-cont'>
            {
                this.state.routeStack.map((r, index) => {
                    const { component: RouteComponent, route, prefetch } = this.getRouteDetail(r)

                    // ... 🙈
                    let left = index <= this.state.routeIndex
                        ? 0
                        : 100
                    let opacity = index < this.state.routeIndex
                        ? 0
                        : 1

                    if (this.state.routeIndex === index && !isAnimating) {
                        left = 100
                        opacity = 1
                    }

                    return <div className="router-item" style={{ left: `${left}%`, opacity }}>
                        <PrefetchRenderer component={RouteComponent} prefetch={prefetch} props={{ route, router: this, ...this.props.props }} route={route} />
                    </div>
                })
            }
        </div>
    }

    getRouteDetail(route: Route): { prefetch?: (route?: Route) => Promise<any>, route: Route, component: React.ComponentClass<any, any> } {
        const { routes } = this.props

        const routeConf = routes[route.key];

        if (!routeConf) {
            console.warn(`Invalid route [${routeConf}], there was no matching route renderer`);
            throw new Error(`Invalid route [${routeConf}], no more routes to try`);
        }

        return {
            component: routeConf.component,
            prefetch: routeConf.prefetch,
            route,
        }
    }

    popRoute(numRoutes = 1) {
        // TODO: protect from emptying stack
        this.setState({
            ...this.state,
            routeStack: this.state.routeStack.slice(0, -numRoutes),
            routeIndex: this.state.routeIndex - numRoutes,
            isAnimating: false
        });
    }

    resetRoute(route: Route) {
        const routeStack = this.state.routeStack
        routeStack[this.state.routeIndex] = route
        this.setState({
            ...this.state,
            routeStack: routeStack,
            isAnimating: false
        });
    }

    pushRoute(route: Route) {
        this.setState({
            ...this.state,
            routeStack: this.state.routeStack.concat(route),
            routeIndex: this.state.routeIndex + 1,
            isAnimating: false
        });
    }
}

interface PrefetchState {
    state: 'pending' | 'loaded' | 'errored' | 'none',
    data?: any
}

class PrefetchRenderer extends React.Component<{ props: any, component: React.ComponentClass, prefetch?: (route: Route) => Promise<any>, route: Route }, PrefetchState> {
    state: PrefetchState = {
        state: 'none'
    }

    componentWillReceiveProps() {
        this.setState({ state: 'none' });
    }

    triggerUpdate() {
        if (!this.props.prefetch) {
            this.setState({ state: 'loaded' });
        } else {
            this.setState({ state: 'pending' });
            this.props.prefetch(this.props.route)
                .then((data) => {
                    this.setState({ state: 'loaded', data });
                })
                .catch((err) => {
                    console.error(`Failed to prefetch component`, err);
                    this.setState({ state: 'errored' });
                });
        }
    }

    render() {
        if (this.state.state === 'none') {
            this.triggerUpdate()
            return <><h3>None</h3></>
        } else if (this.state.state === 'loaded') {
            return <this.props.component {...this.props.props} prefetchedData={this.state.data} />
        } else if (this.state.state === 'pending') {
            return <>
                <h3>Loading</h3>
            </>
        } else if (this.state.state === 'errored') {
            return <>
                <h3>Errored</h3>
            </>
        }
    }
}
