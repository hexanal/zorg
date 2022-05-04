export default {
    type: 'json',
    context: {
        view,
        edit,
        other,
    }
}

export function view(props) {
    return console.log(props);
}

export function edit(props) {
    return console.log(props);
}

export function other(props) {
    return console.log(props);
}
