
export const apiConnection = async (path, method, body) => {
    const link = `http://localhost:5501/${path}`
    let head = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: method.toUpperCase(),
        body: JSON.stringify(body)
    }

    try {
        return await fetch(link, head)
            .then(res => res.json())
            .then(data => {
                return data
            })
    } catch (e) {
        console.log(e);
    }
}

export const openModal = (modalClass) => {
    const modal = document.querySelector(`.${modalClass}`)
    modal.setAttribute('open', '')
}

export const closeModal = (modalClass) => {
    if (!modalClass) {
        document.querySelectorAll('.modal').forEach(modal => modal.removeAttribute('open'))
    } else {
        document.querySelector(`.${modalClass}`).removeAttribute('open')
    }
}

export const formCaptureData = (form) => {

    const inputs = [...form.querySelectorAll('input'), ...form.querySelectorAll('textarea')]

    const data = {}
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i]
        if (input.value.length > 0) {
            data[input.name] = input.value
            if (input.getAttribute('type') === 'number') {
                data[input.name] = Number(input.value)
            }
        } else {
            input.setAttribute('wrong', '')
            setTimeout(() => {
                input.removeAttribute('wrong')
            }, 8000);
        }
    }

    return data
}

export const deleteAcount = async () => {
    const result = apiConnection('users', 'delete', { id: 14 }).then(data => { return data })

    console.log(result);
}

export const numberForBrl = (value) => {
    return new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)
}

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

export const getFebDays = (year) => {
    return (isLeapYear(year) ? 29 : 28)
}

const compareDates = (date) => {
    let parts = date.split('/')
    let today = new Date()
    today.setHours(0, 0, 0, 0)

    date = new Date(parts[2], parts[1] - 1, parts[0])

    return date >= today ? true : false
}

export const getCalendar = (month, year) => {
    const currDate = new Date()
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let first_day = new Date(year, month, 1)

    const listDays = []
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        const day = {}
        if (i >= first_day.getDay()) {
            day.active = ''
            day.attr = `${year}-${(month + 1).toString().padStart(2, '0')}-${(i - first_day.getDay() + 1).toString().padStart(2, '0')}`
            day.txt = i - first_day.getDay() + 1

            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.class = 'curr-date';
            }

            if (!compareDates(`${(i - first_day.getDay() + 1).toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`)) {
                day.pass = ''
            }

            if (year > currDate.getFullYear() || month > currDate.getMonth()) {
                delete day.pass
            }
        }
        listDays.push(day)
    }
    return listDays
}

export const dateFormat = (date) => {
    return date.split('-').reverse().join('/')
}

export const whatsMsg = (number, msg) => {
    if (!msg) {
        msg = ''
    }
    window.open(`https://api.whatsapp.com/send/?phone=${number}&text=${msg}`)
}

export const openLink = ({ target }) => {
    
    if (target.tagName) {
        const link = target.getAttribute('link')
        window.open(link)
    } else {
        if (target) {
            window.open(target)
        }
    }
}

export const sortListHour = (list) => {
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = 0; j < list.length; j++) {
            const hora1 = list[i].hora.split(':')[0]
            const hora2 = list[i + 1].hora.split(':')[0]
            if (Number(hora1) > Number(hora2)) {
                let v1 = list[i]
                let v2 = list[i + 1]
                list[i] = v2
                list[i + 1] = v1
            }
        }
    }

    return list
}

export const logOut = () => {
    localStorage.removeItem("barbershop:user")
}

export const baseUrl = '/barbershop/#'