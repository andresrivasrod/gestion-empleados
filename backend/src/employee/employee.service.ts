import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employee | undefined> {
    return this.employeeRepository.findOne(id);
  }

  async create(employee: Employee): Promise<Employee> {
    return this.employeeRepository.save(employee);
  }

  async update(id: number, employee: Employee): Promise<Employee | undefined> {
    await this.employeeRepository.update(id, employee);
    return this.employeeRepository.findOne(id); // Devuelve el empleado actualizado
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }

  async generateReport(): Promise<Buffer> {
    const employees = await this.employeeRepository.find();
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {});

    doc.text('Employee Report');
    doc.text('Total Employees: ' + employees.length);
    const availableEmployees = employees.filter(e => e.availability === 'available').length;
    const unavailableEmployees = employees.filter(e => e.availability !== 'available').length;
    doc.text('Available: ' + availableEmployees);
    doc.text('Unavailable: ' + unavailableEmployees);

    doc.end();
    return Buffer.concat(buffers);
  }
}
