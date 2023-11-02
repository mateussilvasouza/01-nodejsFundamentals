export const buildRoutePath = (path) => {
    const routeParamsRegex = /:([a-zA-Z])+/g
    const pathWithParams = path.replaceAll(routeParamsRegex,'(?<id>[a-zA-Z0-9\-_]+)')
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
}