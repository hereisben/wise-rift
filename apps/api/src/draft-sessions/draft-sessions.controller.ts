import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';
import { DraftSessionsService } from './draft-sessions.service.js';
import { AddDraftBanDto } from './dto/add-draft-ban.dto.js';
import { AddDraftPickDto } from './dto/add-draft-pick.dto.js';
import { CreateDraftSessionDto } from './dto/create-draft-session.dto.js';
import { SaveMatchOutcomeDto } from './dto/save-match-outcome.dto.js';

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

  @Post(`:id/match-outcome`)
  async saveDraftSessionMatchOutcome(
    @Param(`id`) id: string,
    @Body() saveMatchOutcomeDto: SaveMatchOutcomeDto,
  ) {
    const matchOutcome = await this.draftSessionsService.saveMatchOutcome(
      id,
      saveMatchOutcomeDto,
    );
    return successResponse(`Save match outcome successfully`, matchOutcome);
  }

  @Get()
  async findAll() {
    const draftSessions = await this.draftSessionsService.findAll();

    return successResponse(`Get draft sessions successfully`, draftSessions);
  }

  @Get(`:id/recommendations`)
  async findDraftSessionRecommendationResults(@Param(`id`) id: string) {
    const recommendationResults =
      await this.draftSessionsService.findDraftRecommendationResults(id);
    return successResponse(
      `Get draft session recommendations results successfully`,
      recommendationResults,
    );
  }

  @Get(`:id/match-outcome`)
  async getDraftSessionMatchOutcome(@Param(`id`) id: string) {
    const matchOutcome = await this.draftSessionsService.getMatchOutcome(id);
    return successResponse(
      `Get draft session match outcome successfully`,
      matchOutcome,
    );
  }

  @Get(`:id`)
  async findOne(@Param(`id`) id: string) {
    const draftSession = await this.draftSessionsService.findOne(id);
    return successResponse(`Get draft session successfully`, draftSession);
  }
}
