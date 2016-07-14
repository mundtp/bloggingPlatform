import {UserModel} from './models/models'

const ACTIONS = {
	registerUser: function(email,password) {
		var newUsr = new UserModel()
		return newUsr.register(email,password).then(function(resp){
			console.log(resp)
			return newUsr.logUserIn()
		})
	},

	logUserIn: function(email,password) {
		var newUsr = new UserModel()
		return newUsr.login(email,password).then(function(resp){
			console.log(resp)
			location.hash = "home"
		})
	},

	logUserOut: function() {
		let newUsr = new UserModel()
		return newUsr.logout().then(() => {
			location.hash = "login"
		})
	}
}

export default ACTIONS