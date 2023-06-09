import { DiskStorage } from "../../providers/DiskStorage.js"
import { AppError } from "../../utils/AppError.js"

export class DishImageUpdateService {
  constructor(userRepository, dishRepository) {
    this.userRepository = userRepository
    this.dishRepository = dishRepository
  }

  async execute({ user_id, dish_id, imageFilename }) {
    const diskStorage = new DiskStorage()

    const user = await this.userRepository.findById(user_id)
    const dish = await this.dishRepository.findById(dish_id)

    if (!user.isAdmin) {
      throw new AppError('Você não é um usuário admin.')
    }

    if (dish.image) {
      await diskStorage.deleteFile(dish.image)
    }

    const filename = await diskStorage.saveFile(imageFilename)
    dish.image = filename

    await this.dishRepository.updateImage(dish_id, imageFilename)
  }
}