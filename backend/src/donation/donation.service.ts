import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DonationEntity } from "./entities/donation";
import { Repository } from "typeorm";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { DONATION_SELECT } from "./donation.select";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { UpdateDonationDto } from "./dto/update-donation.dto";

@Injectable()
export class DonationService {
    constructor(
        @InjectRepository(DonationEntity)
        private readonly donationRepository: Repository<DonationEntity>,
    ) { }

    async getAll(pagination: PaginationDto) {
        const { limit = 10, offset = 0 } = pagination;

        const donations = await this.donationRepository.find({
            take: limit,
            skip: offset,
            select: DONATION_SELECT.BASIC
        });

        return donations;
    }

    async getOne(id: number) {
        const donation = await this.donationRepository.findOne({
            where: { id },
            select: DONATION_SELECT.FULL
        });

        if (!donation) throw new NotFoundException('Doação não encontrada')

        return donation;
    }

    async create(body: CreateDonationDto) {
        const newDonation = {
            ...body
        };

        const donation = this.donationRepository.create(newDonation);

        return await this.donationRepository.save(donation);
    }

    async update(id: number, body: UpdateDonationDto) {
        const donation = await this.getOne(id);

        const updatedDonation = this.donationRepository.merge(donation, body);

        return await this.donationRepository.save(updatedDonation);
    }

    async delete(id: number) {
        const donation = await this.getOne(id)

        return await this.donationRepository.remove(donation);
    }
}