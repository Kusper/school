const scheduleColumns = document.querySelectorAll(".schedule-container-lessons__card-day");

//  Add a new subject here
//  First is name in DB and second is class for div
const divBackgrounds = {
    "Математика": "math",
    "Англійська мова": "foreign-language",
    "Фізика": "physics",
    "Хімія": "chemistry",
    "Українська література": "literature",
    "Історія України": "history",
    "Географія": "geography",
    "Українська мова": "ukrainian-language",
    "Біологія": "biology"
}

async function loadSchedule() {
    try{
        const response = await fetch(`/api/schedule`);
        const data = await response.json();
        // Check data existance
        if( data.length === 0){
            console.error("[fetchSchedule.js] No schedule to fetch", error);
            return;
        }

        data.forEach((item, index) => {

            const date = new Date(item.date);
            const targetDiv = scheduleColumns[getDayOfWeek(date.getDay())];

            if(isDateInCurrentWeek(item.date))
            {
                // console.log(`[fetchSchedule.js] ${item.ID} | Item date = ${item.date} | Date in current week? = ${isDateInCurrentWeek(item.date)}`);

                targetDiv.innerHTML += `<div class="schedule-container-lessons__card ${divBackgrounds[item.subject]}">	
                        <div class="schedule-container-lessons__card-name"><h2 itemprop="name">${item.subject}</h2></div>
                        <div class="schedule-container-lessons__card-time"><h2 itemprop="duration">${item.start_time.slice(0, -3)}-${item.end_time.slice(0, -3)}</h2></div>
                        <div class="schedule-container-lessons__card-button">
                            <img
                                class="schedule-container-lessons__card-button__img"
                                src="../images/home/pointer.svg"
                                alt="Додаткова інформація щодо уроку"
                                loading="lazy">
                        </div>
                        <div class="schedule-container-lessons__card-description">
                                <h3 itemprop="teacher">${item.teacher}</h3>
                            <h3 itemprop="about">${item.topic}</h3>
                        </div>
                    </div>`; 
            }
        });
    }
    catch(error) { console.error("[fetchSchedule.js] Error fetching schedule:", error) }
    
}

function getDayOfWeek(dayNumber){    
    if(dayNumber === 0)  dayNumber = 6;
    else dayNumber -= 1;

    return dayNumber;
}

function getStartEndOfWeek(){
    const currentDate = new Date();

    const currentDayInWeek = getDayOfWeek(currentDate.getDay()); 
    const currentDayInMonth = currentDate.getDate(); 

    const mondayDateOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDayInMonth - currentDayInWeek);
    mondayDateOfWeek.setHours(0, 0, 0, 0);
    const sundayDateOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDayInMonth + (6 - currentDayInWeek));
    sundayDateOfWeek.setHours(23, 59, 59, 999);

    return {mondayDateOfWeek, sundayDateOfWeek}
}

function isDateInCurrentWeek(dateToCheck){
    const { mondayDateOfWeek, sundayDateOfWeek } = getStartEndOfWeek();

    const date = new Date(dateToCheck);
    date.setHours(0, 0, 0, 0);
    return date >= mondayDateOfWeek && date <= sundayDateOfWeek;
}
// Insert photos on page loading
addEventListener(document, loadSchedule() );

// button.addEventListener("click", function (e) {
//     e.preventDefault();
//     loadSchedule();
// });

