 export const API_NOTIFICATION_MESSAGES={
    loading:{
        title: 'Loading...',
        message:'Data is being loaded please wait...'
    },
    success:{
        title:'Success',
        message: 'Data successfully loaded'
    },
    responsefailure:{
        title:'Error',
        message:'An error occured while fetching response from the server.'
    },
    requestFailure:{
        title: 'Error',
        message: 'An error occured while parsing request data'
    },
    networkError:{
        title:'network error',
        message:'Unable to connect. Please check internet connectivity and try later.'
    }
}

//API service call
// (url: '/', method: 'POST/GET/PUT/DELETE', params:true/false, query:true/false)
export const SERVICE_URLS={
    userSignup:{url:'/signup' ,method:'POST'},
    userLogin:{url: '/login', method:'POST'},
    blogCreate:{url: '/createBlog', method:'POST'},
    logoutUser:{url: '/logout', method:'POST'},
    sendNotif:{url: '/sendNotif', method: 'POST'},

    googleLogin:{url:'/google',method:'GET'},
    getAllPosts:{url:'/getAllPosts', method:'GET',params:true},
    getPostById: {url: '/getPostById', method:'GET', query:true},
    getProfile:{url:'/profile', method:'GET',query:true},
    getUserPosts: {url:'/userPosts', method:'GET', query:true},
    getSubscribers:{url:'/getSubscribers', method:'GET', query:true},
    getRelatedPosts:{url:'/getRelatedPosts', method:'GET', query:true},
    getNotifs:{url: '/getNotifs', method:'GET', query:true},
    
    updateProfile:{url: '/updateProfile', method:'PUT', query:true},
    updatePosts:{url: '/updatePosts', method:'PUT', query:true},
    subscribe:{url: '/subscribe', method:'PUT', query:true},
    like:{url: '/like', method: 'PUT', query:true},
    putComment:{url:'/putComment', method:'PUT', query: true},

    deletePost:{url: '/deletePost', method:'DELETE', query:true},
    deleteNotifs: {url: '/deleteNotifs', method: 'DELETE', query: true}
}