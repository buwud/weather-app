const square = function (x)
{
    return x * x
}

const square1 = (x) =>
{
    return x * x
}

const square2 = (x) => x * x

const event = {
    name: 'Birthday party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList()
    {
        console.log('Guest list for ' + this.name)

        //function ise that. 
        //arrow func. ise this ile kullanabiliyoruz
        this.guestList.forEach((guest) =>
        {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}