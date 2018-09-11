const generateRoutes = (path, params) => {
    // params is an array that consists of params for route 
    // in order from first to last param

    // firstly check if the number of params is equal with 
    // the number of params necessary for the path
    const numberOccurences = (path.match(/:/g)||[]).length;
    if (params.length != numberOccurences) {
        alert('not have all params given');
        return;
    }
    
    // replace in order all params from path with parameteres from params array
    for (let i = 0; i < params.length; i++) {
        const indexStartFirstParam = path.indexOf(':', 0);
        const indexEndFirstParam = path.indexOf('/', indexStartFirstParam);
        let path1 = path.substring(0, indexStartFirstParam);
        path1 = path1 + params[i];
        if (indexEndFirstParam == -1){
            indexEndFirstParam = path.length;
        }
        let path2 = path.substring(indexEndFirstParam);
        path = path1 + path2;
    }
    return path;
}

export default generateRoutes;