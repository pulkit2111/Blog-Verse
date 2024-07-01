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

export const SERVICE_URLS={
    userSignup:{url:'/signup' ,method:'POST'},
    userLogin:{url: '/login', method:'POST'},
    blogCreate:{url: '/createBlog', method:'POST'}
}