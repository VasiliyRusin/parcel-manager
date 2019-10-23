export default {
    methods: {
        emailValidator: function (string) {
            return !/^[\S]+@[\w]+\.[\w.]+$/i.test(string);
        },

        passwordValidator: function (string) {
            return !/^\S{6,}$/.test(string);
        }
    }
};
