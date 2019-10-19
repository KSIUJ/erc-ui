function periodText(item) {
    return item.start_date + ' - ' + item.end_date;
}

function memberText(item) {
    return item.given_name + ' ' + item.surname;
}

export {memberText, periodText};
