// for server
export default function fetchComponentData(dispatch, components, params) {

    const needs = components.reduce((prev, current) => {
        return Object.keys(current).reduce((acc, key) => {
            return current[key].hasOwnProperty('needs') ? current[key].needs.concat(acc) : acc
        }, prev)
    }, []);
    const promises = needs.map(need => dispatch(need(params)));
    return Promise.all(promises);
}

// for client
export function fetchNeeds(needs, props) {

    const { params, dispatch } = props;
    needs.map(need => dispatch(need(params)))
}
