import AuthService from '../services/api/authService';
class ServiceProvider {
  static instance = {}
  providers = [
    {
      name: 'AuthService',
      path: AuthService
    },
  ]

  constructor() {
    for (const provider of this.providers) {
      if (!ServiceProvider.instance[provider.name]) {
        ServiceProvider.instance[provider.name] = new provider.path()
      }
    }
  }

  getInstance() {
    return ServiceProvider.instance
  }
}

export default new ServiceProvider().getInstance()
