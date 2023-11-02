export function buildRoutePath(path){
    const routeParamsRegex = /:([a-zA-z0-9]+)/g
    const pathWithParams = path.replaceAll(routeParamsRegex,'(?<id>[a-zA-z0-9\-_]+)')
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex

}