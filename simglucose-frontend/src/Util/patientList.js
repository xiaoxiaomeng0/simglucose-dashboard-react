function AddPatient() {
    const patient_list = []

    const add_patient = (list, name) => {
        for (let i=1; i<10; i++) {
            list.push(`${name}#00${i}`)
        };
        list.push(`${name}#010`)
    }

    add_patient(patient_list, "adolescent")
    add_patient(patient_list, "adult")
    add_patient(patient_list, "child")
    return patient_list
}

export default AddPatient
