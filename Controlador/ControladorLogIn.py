from Modelo.User import verificar_login

class ControladorLogin:
    def __init__(self):
        pass

    def validar_credenciales(self, usuario, contraseña):
        return verificar_login(usuario, contraseña)
