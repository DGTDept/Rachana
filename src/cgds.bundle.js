
import * as bootstrap from 'bootstrap';
import "./_componentjs/combobox"
import "./_patternjs/date_picker"
import "./_patternjs/phonenumber"


const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
