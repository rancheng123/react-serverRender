
const login = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('./page/login/login').default)
    },'login')
}

const home = (location, callback)=>{
    require.ensure([],require=>{

        callback(null,require('./page/home/home').default)
    },'home')
}

const routes = [
    {
        path: '/',
        //此属性必填
        exact: true,
        getComponent: home
    },
    {
        path: '/home',
        getComponent: home
    },
    {
        path: '/login',
        getComponent: login
    }

];
export default routes;

