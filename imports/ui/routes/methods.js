const generateRoutes = (path, params) => {
    // params is an object that consists of params for route 
    const paramOccurances = path.match(/(:[A-z])\w+/g);
    // check if all params that path needs are received
    let paramsNeeded = [];
    for (let i = 0; i < paramOccurances.length; i++) {
        if (!(paramOccurances[i].substring(1) in params)) {
            paramsNeeded.push(paramOccurances[i].substring(1));
        }
    }
    if (paramsNeeded.length != 0) {
        console.log(`these ${paramsNeeded} params are needed`);
        return;
    }
    // replace corresponding params in path
    for (let i = 0; i < paramOccurances.length; i++) {
        path = path.replace(paramOccurances[i], params[paramOccurances[i].substring(1)]);
    }
    console.log(path);
}

export default generateRoutes;