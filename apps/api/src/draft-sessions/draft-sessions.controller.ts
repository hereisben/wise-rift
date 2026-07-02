import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';
import { DraftSessionsService } from './draft-sessions.service.js';
import { AddDraftBanDto } from './dto/add-draft-ban.dto.js';
import { AddDraftPickDto } from './dto/add-draft-pick.dto.js';
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

  @Post(`:id/bans`)
  async addBan(
    @Param(`id`) id: string,
    @Body() addDraftBanDto: AddDraftBanDto,
  ) {
    const draftSession = await this.draftSessionsService.addBan(
      id,
      addDraftBanDto,
    );
    return successResponse(`Add draft ban successfully`, draftSession);
  }

  @Post(`:id/picks`)
  async addPick(
    @Param(`id`) id: string,
    @Body() addDraftPickDto: AddDraftPickDto,
  ) {
    const draftSession = await this.draftSessionsService.addPick(
      id,
      addDraftPickDto,
    );

    return successResponse(`Add draft pick successfully`, draftSession);
  }

  @Post(`:id/recommendations`)
  async createDraftSessionRecommendation(@Param(`id`) id: string) {
    const recommendationResult =
      await this.draftSessionsService.createDraftSessionRecommendation(id);

    return successResponse(
      `Create draft session recommendation successfully`,
      recommendationResult,
    );
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
