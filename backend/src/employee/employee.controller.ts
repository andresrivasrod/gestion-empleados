import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Post()
  create(@Body() employee: Employee): Promise<Employee> {
    return this.employeeService.create(employee);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() employee: Employee): Promise<Employee> {
    const updatedEmployee = await this.employeeService.update(id, employee);
    return updatedEmployee; // Devuelve el objeto actualizado
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.employeeService.remove(id);
  }
}
