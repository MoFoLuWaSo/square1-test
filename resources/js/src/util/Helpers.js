class Helpers {

    static objectFormBuilder(form, object) {


        for (let name in object) {

            if (object.hasOwnProperty(name)) {
                if (object[name] === undefined || object[name] === null || object[name] === "null") {

                    form.append(name, '');
                } else {

                    form.append(name, object[name]);
                }
            }
        }

        return form;
    }

    static normalizeJson(object) {
        let newObject = {};
        for (let name in object) {

            if (object.hasOwnProperty(name)) {
                newObject[name] = object[name] ? object[name].toString() : '';
            }
        }

        return newObject;

    }

    static normalizeJsonStringify(object) {
        let newObject = {};
        for (let name in object) {

            if (object.hasOwnProperty(name)) {
                newObject[name] = object[name] !== null ? object[name].toString() : '';
            }
        }

        return newObject;

    }



    static getIdFromSlug(slug) {
        let name = slug.split("-");
        return name[name.length - 1];

    }

    static getTitleFromSlug(slug) {
        if (slug) {

            let name = slug.split("-");
            let length = name.length - 1;
            let title = "";
            for (let i = 0; i < length; i++) {
                title += name[i] + " ";
            }
            return title;
        }
        return "";

    }

    static getMomentDateFromSQL(date, moment) {
        if (date) {
            return moment(new Date(date));
        }
        return '';
    }

    static getSQLDateFromMoment(date) {
        let dateFormat = 'YYYY-MM-DD';
        if (date) {

            return date.format(dateFormat);
        }
        return '';
    }

    static getSQLDateTimeFromMoment(date) {
        let dateFormat = 'YYYY-MM-DD HH:mm:ss';
        if (date) {

            return date.format(dateFormat);
        }
        return '';
    }

    static getSQLTimeFromMoment(date) {
        let dateFormat = 'HH:mm:ss';
        if (date) {

            return date.format(dateFormat);
        }
        return '';
    }

    static displayDate(date) {
        let dateFormat = 'YYYY-MM-DD';
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        if (date) {
            let dateTime = new Date(date);
            let day = dateTime.getDate();
            let month = months[dateTime.getMonth()];
            let year = dateTime.getFullYear();
            return day + " " + month + ", " + year;
        }
        return '';
    }

    static displayDateTime(date) {

        let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        if (date) {
            let dateTime = new Date(date);

            return dateTime.getDate() + " " + months[dateTime.getMonth()] + " " + dateTime.getFullYear() + " " + new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), dateTime.getHours() - 1, dateTime.getMinutes(), dateTime.getSeconds()).toLocaleTimeString();

        }
        return '';
    }



    static normalizeValue(value) {
        if (value) {
            return value;
        }
        return "";
    }

    static createSlug(title, id) {
        return title.replace(" ", "-") + "-" + id;
    }



}

export default Helpers;
