// import { Test, TestingModule } from '@nestjs/testing';
// import { CategoryService } from './../category.service';
// import { CategoryRepository } from '../infrastructure/persistence/category.repository';

// describe('CategoryService', () => {
//   let service: CategoryService;
//   let categoryRepository: CategoryRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CategoryService,
//         {
//           provide: CategoryRepository,
//           useValue: {
//             findOne: jest.fn(),
//             getAllCourseOfCategory: jest.fn(),
//             getAllInstructorOfCategory: jest.fn(),
//             getGategoryDetails: jest.fn(),
//             create: jest.fn(),
//             softDelete: jest.fn(),
//             findManyWithPagination: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<CategoryService>(CategoryService);
//     categoryRepository = module.get<CategoryRepository>(CategoryRepository);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('findOne', () => {
//     it('should call categoryRepository.findOne with provided options', async () => {
//       const options = {}; // provide options for testing
//       await service.findOne(options);
//       expect(categoryRepository.findOne).toHaveBeenCalledWith(options);
//     });
//   });

//   describe('getAllCourseOfCategory', () => {
//     it('should call categoryRepository.getAllCourseOfCategory with provided options', async () => {
//       const options = {
//         filterOptions: null,
//         sortOptions: null,
//         search: 'test',
//         paginationOptions: {
//           page: 3,
//           limit: 1,
//         },
//         categor_id: 'test_id',
//       };
//       await service.getAllCourseOfCategory(options);
//       expect(categoryRepository.getAllCourseOfCategory).toHaveBeenCalledWith(
//         options,
//       );
//     });
//   });

//   describe('getAllInstructorOfCategory', () => {
//     it('should call categoryRepository.getAllInstructorOfCategory with provided options', async () => {
//       const options = {
//         filterOptions: null,
//         sortOptions: null,
//         search: 'test',
//         paginationOptions: {
//           page: 3,
//           limit: 1,
//         },
//         categor_id: 'test_id',
//       };
//       await service.getAllInstructorOfCategory(options);
//       expect(
//         categoryRepository.getAllInstructorOfCategory,
//       ).toHaveBeenCalledWith(options);
//     });
//   });

//   describe('getGategoryDetails', () => {
//     it('should call categoryRepository.getGategoryDetails with provided category_id', async () => {
//       const category_id = 'test_id'; // provide category_id for testing
//       await service.getGategoryDetails(category_id);
//       expect(categoryRepository.getGategoryDetails).toHaveBeenCalledWith(
//         category_id,
//       );
//     });
//   });

//   describe('create', () => {
//     it('should call categoryRepository.create with provided data and user_id', async () => {
//       const data = {
//         name: 'fsdfd',
//         color: '#000000',
//         background_color: '#000000',
//         icon: '',
//         courses_count: 2,
//         create_by: '1223456889756',
//         createdAt: Date,
//         deletedAt: null,
//       };
//       const user_id = 'test_user_id';
//       await service.create(data, user_id);
//       expect(categoryRepository.create).toHaveBeenCalledWith(
//         expect.any(Object),
//       );
//     });
//   });

//   describe('softDelete', () => {
//     it('should call categoryRepository.softDelete with provided id', async () => {
//       const id = 'test_id'; // provide id for testing
//       await service.softDelete(id);
//       expect(categoryRepository.softDelete).toHaveBeenCalledWith(id);
//     });
//   });

//   describe('findManyWithPagination', () => {
//     it('should call categoryRepository.findManyWithPagination with provided options', async () => {
//       const options = {
//         filterOptions: null,
//         sortOptions: null,
//         paginationOptions: {
//           page: 3,
//           limit: 1,
//         },
//       };
//       await service.findManyWithPagination(options);
//       expect(categoryRepository.findManyWithPagination).toHaveBeenCalledWith(
//         options,
//       );
//     });
//   });
// });
