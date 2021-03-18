let file_content = ""

document.getElementById('inputfile')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            // document.getElementById('output')
            //     .textContent = fr.result;
            file_content = fr.result
        }
        fr.readAsText(this.files[0]);
    })


function load_file_afd() {
    if (!file_content) {
        console.log('please insert file')
    }else{
        console.log(file_content)
    }
}

function single_entry() {
    let user_input = $('#inputEntrada')
    if (!user_input.val()) {
        console.log('insert valid input')
    }else{
        console.log(user_input.val())
    }

    user_input.val('')

}