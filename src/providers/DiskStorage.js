import * as uploadConfig from "../configs/upload.js"
import path from 'path'
import fs from "fs"

export class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      await fs.promises.stat(filePath)
    } catch(error) {
      return console.error(error)
    }

    await fs.promises.unlink(filePath)
  }
}