interface Personal {
    id: number;
    persname: string;
    email: string;
}

class PersonalDto {
    id: number;
    persname: string;
    email: string;

    constructor(pers: Personal) {
        this.id = pers.id;
        this.persname = pers.persname;
        this.email = pers.email;
    }
}

export default PersonalDto;
