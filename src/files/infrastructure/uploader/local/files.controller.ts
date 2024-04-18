import {
  Controller,
  Get,
  Param,
  Post,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilesLocalService } from './files.service';
import { FileType } from 'src/files/domain/file';

@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
export class FilesLocalController {
  constructor(private readonly filesService: FilesLocalService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.filesService.create(file);
  }

  @Get(':path')
  @ApiParam({
    name: 'path',
    type: 'string',
  })
  download(@Param('path') path, @Response() response) {
    return response.sendFile(path, { root: './files' });
  }

  @Post('video/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        callback(null, true);
      },
      limits: {
        fileSize: 4 * 1024 * 1024 * 1024, //4 gb
      },
    }),
  )
  async UploadVideoForStreaming(@UploadedFile() file: Express.Multer.File) {
    const video: { file: FileType } = await this.filesService.create(file);
    /*    const mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET,
    });
    const asset = await mux.video.assets.create({
      input: [{ url: video.file.path }],
      playback_policy: ['public'],
    });*/
    return video;
  }
}
