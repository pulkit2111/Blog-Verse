import { useEffect, useContext} from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { DataContext } from "../context/DataProvider";

export const getAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
};

export const getType=(value,body)=>{
    if(value.params){
        return {params:body}
    }else if(value.query){
        if(typeof body === 'object'){
            return {query: body._id}
        } else{
            return {query:body}
        }
    }
    return {};
}

const useQuery=()=>{
    return new URLSearchParams(useLocation().search);
}

const GoogleCallback=({isUserAuthenticated})=>{
    const query=useQuery();
    const navigate = useNavigate();
    const {setAccount}=useContext(DataContext);
    useEffect(() => {
        const accessToken = query.get('accessToken');
        const refreshToken = query.get('refreshToken');
        const email= query.get('email');
        const name= query.get('name');
        const picture= query.get('picture');
        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setAccount({email,name,picture});
            // Redirect to the desired page
            isUserAuthenticated(true);
            navigate('/');
        }
        else{
            isUserAuthenticated(false);
            navigate('/login');
        }
    }, [query, setAccount, navigate, isUserAuthenticated]);
    return null;
}

export default GoogleCallback;