
import * as bootstrap from 'bootstrap';
import "./_patternjs/date_picker"

import "./_componentjs/combobox"

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
