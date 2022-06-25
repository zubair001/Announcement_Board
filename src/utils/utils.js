exports.utils = {

    getOldDate(days) {
        if (days > 1)
            return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        else {
            const today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), today.getDate())
        }
    }

};
