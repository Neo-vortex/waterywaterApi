import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Path,
	Route,
	Body,
	Tags,
	Security
} from 'tsoa';
import { Vase } from './vase.entity';
import {
	getVases,
	getVaseById,
	getVasesByUserId,
	createVase,
	updateVase
	// deleteVase
} from './vase.service';
import { CreateVaseDto } from './dto/create-vase.dto';
import { UpdateVaseDto } from './dto/update-vase.dto';
import { ValidationError, NotFoundError } from '../../common/error/baseError';
import { CommonResponses } from '../../common/decorators/commonResponses.decorator';

@Route('vases')
@Tags('Vases')
export class VaseController extends Controller {
	@Get()
	@Security('jwt')
	@CommonResponses()
	async getVasesHandler() {
		return await getVases();
	}

	@Get('{vaseId}')
	@Security('jwt')
	@CommonResponses()
	async getVaseByIdHandler(@Path() vaseId: Vase['id']) {
		try {
			return await getVaseById(vaseId);
		} catch (err) {
			if (err instanceof ValidationError) {
				this.setStatus(400);
				throw err;
			}
			if (err instanceof NotFoundError) {
				this.setStatus(404);
				throw err;
			}
			throw err;
		}
	}

	@Get('user/{userId}')
	@Security('jwt')
	@CommonResponses()
	async getVasesByUserIdHandler(@Path() userId: string) {
		try {
			return await getVasesByUserId(userId);
		} catch (err) {
			if (err instanceof ValidationError) {
				this.setStatus(400);
				throw err;
			}
			throw err;
		}
	}

	@Post()
	@Security('jwt')
	@CommonResponses()
	async createVaseHandler(@Body() data: CreateVaseDto) {
		try {
			return await createVase(data);
		} catch (err) {
			if (err instanceof ValidationError) {
				this.setStatus(400);
				throw err;
			}
			throw err;
		}
	}

	@Put('{vaseId}')
	@Security('jwt')
	@CommonResponses()
	async updateVaseHandler(
		@Path() vaseId: Vase['id'],
		@Body() data: UpdateVaseDto
	) {
		try {
			return await updateVase(vaseId, data);
		} catch (err) {
			if (err instanceof ValidationError) {
				this.setStatus(400);
				throw err;
			}
			if (err instanceof NotFoundError) {
				this.setStatus(404);
				throw err;
			}
			throw err;
		}
	}

	// @Delete('{vaseId}')
	// @Security('jwt')
	// @CommonResponses()
	// async deleteVaseHandler(@Path() vaseId: Vase['id']) {
	// 	try {
	// 		return await deleteVase(vaseId);
	// 	} catch (err) {
	// 		if (err instanceof ValidationError) {
	// 			this.setStatus(400);
	// 			throw err;
	// 		}
	// 		if (err instanceof NotFoundError) {
	// 			this.setStatus(404);
	// 			throw err;
	// 		}
	// 		throw err;
	// 	}
	// }
}
