import {useState, useEffect} from 'react';
import axios from 'axios';

const useAxiosFetch = (dataurl) => {
    const [data,setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("Inside use axios custom hook");
        let isMounted = true;
        const source = axios.CancelToken.source();
        const controller = new AbortController();
        const fetchData = async(url) => {
            setIsLoading(true);
            try{
                console.log("Inside axios customer hook");
                    console.log(data);
                const response = await axios.get(url,{
                    signal: AbortSignal.timeout(5000)
                });
                if(isMounted){
                    setData(response.data);
                    
                    setFetchError(null);
                }
            }catch(error){
                if(isMounted){setFetchError(error.message)};
                    
            }
            finally{
                isMounted && setTimeout(() => setIsLoading(false),2000);
            }

            }

            fetchData(dataurl);

            const cleanUp = () => {
                console.log("clean up running")
                isMounted = false;
                controller.abort();
            }
            return cleanUp;
        
    },[dataurl])

    return {data,fetchError,isLoading}
}

export default useAxiosFetch;