
export const EXAMPLE = "EXAMPLE";

export const GET_CLASS = "GET_CLASS";

//this is an example
export const updateInfo =  jsonText =>({
    type:EXAMPLE,
    content:jsonText
});

//this is an example for async request
export const getAllClass = () => dispatch => {
    return fetch(preURL+"/getAllClass",{credentials: 'include'}).then(response=>response.json()).then(
        responseText=>{
            dispatch(receiveAllClass(responseText));
        }
    )
};

export const receiveAllClass = jsonText =>({
    type:GET_CLASS,
    content:jsonText
});
