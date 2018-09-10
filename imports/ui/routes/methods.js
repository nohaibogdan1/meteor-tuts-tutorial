const generateRoutes = (path, params) => {
    path = path.slice(0, path.length - 4);
    return path + params;
}

export default generateRoutes;