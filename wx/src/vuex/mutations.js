export default {
    setType: ((state, param) => {
        if (!param) {
            return;
        }
        state.type = param;
    }),
}