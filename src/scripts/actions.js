import {UserModel} from './models/models'

const ACTIONS = {
	registerUser: function(email,password) {
		var newUsr = new UserModel()
		newUsr.register(email,password).then(function(resp){
			console.log(resp)
		})
	}
}

export default ACTIONS