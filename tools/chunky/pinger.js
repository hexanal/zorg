let registry = [];

export function pong(type, cb) {
    registry.push({type, cb});
    return () => unpong(type, cb);
}

export function unpong(pingType, cb) {
    // @todo mutate? or ?
    registry = registry.filter(sig => (sig.type !== pingType && sig.cb !== cb));
}

export function ping(pingType, pingPayload) {
    const callbacks = registry.map(({type, cb}) => {
      if (type === pingType) return cb(pingPayload);
    });

    // @todo resolve all and then pass pingPayload?!
    return Promise.resolve(pingPayload);
}

// @todo maybe don't depend on react so much
// export function usePong(type, cb) {
//     useEffect(() => {
//         pong(type, cb);
//         return () => unpong(type, cb);
//     }, );
// }

export default {
    ping,
    pong,
    unpong,
};
