const generateRoutes = (path, params) => {
    // params is an object that consists of params for route 
    // in order from first to last param

    // firstly check if the number of params is equal with 
    // the number of params necessary for the path
    const numberOccurences = (path.match(/:/g)||[]).length;
    var numberParams = Object.keys(params).length;
    
    if (numberParams != numberOccurences) {
        alert('not have all params given');
        return;
    }

    for (var param in params) {
        if (params.hasOwnProperty(param)) {
            const indexStartParam = path.indexOf(param, 0) - 1;
            if (indexStartParam == -2) {
                alert(`there is no ${param} in path`);
                return;
            }
            let pathTillEndParam = path.substring(0, indexStartParam);
            pathTillEndParam = pathTillEndParam + params[param];
            indexEndParam = path.indexOf('/', indexStartParam);
            if (indexEndParam == -1) {
                indexEndParam = path.length;
            }
            let pathAfterParam  = path.substring(indexEndParam);
            path = pathTillEndParam + pathAfterParam;
        }
    }

}

export default generateRoutes;