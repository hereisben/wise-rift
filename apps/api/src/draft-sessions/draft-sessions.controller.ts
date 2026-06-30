import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';
import { DraftSessionsService } from './draft-sessions.service.js';
import { CreateDraftSessionDto } from './dto/create-draft-session.dto.js';

@Controller(`draft-sessions`)
export class DraftSessionsController {
  constructor(private readonly draftSessionsService: DraftSessionsService) {}

  @Post()
  async createOne(@Body() draftSessionInput: CreateDraftSessionDto) {
    const draftSession =
      await this.draftSessionsService.create(draftSessionInput);
    return successResponse(`Create draft session successfully`, draftSession);
  }

  @Get()
  async findAll() {
    const draftSessions = await this.draftSessionsService.findAll();

    return successResponse(`Get draft sessions successfully`, draftSessions);
  }

  @Get(`:id`)
  async findOne(@Param(`id`) id: string) {
    const draftSession = await this.draftSessionsService.findOne(id);
    return successResponse(`Get draft session successfully`, draftSession);
  }
}
