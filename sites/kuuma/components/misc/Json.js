export default {
    type: 'json',
    context: { view }
}

export function view(props) {
    return console.log(props);
}
