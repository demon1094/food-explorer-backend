export class UserDeleteService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(id) {
    this.userRepository.delete(id)
  }
}