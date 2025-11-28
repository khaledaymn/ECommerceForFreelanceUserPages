// src/app/pages/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Services
import { ApiService } from '../../services/api.service';
// import { contentService } from '../../services/admin-data.service'; // ← جديد

// Interfaces
import { Product, ProductParams } from '../../interfaces/product.interface';
import { Category, CategoryParams } from '../../interfaces/category.interface';
import { AdminData } from '../../interfaces/content.interface';
import { contentService } from '../../services/content.service';
// import { AdminData } from '../../interfaces/admin-data.interface'; // ← جديد

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // بيانات الموقع من AdminData
  siteData!: AdminData;
  siteLoading = true;

  // منتجات وفئات
  featuredProducts: Product[] = [];
  categories: Category[] = [];
  loading = false;

  products: Product[] = [];
  categoryId: string | null = null;
  filteredProducts: Product[] = [];
  errorMessage: string | null = null;

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalItems = 0;

  searchQuery = '';
  searchTerm = '';
  statusFilter = '';
  categoryFilter = '';
  sortColumn = 'name';
  sortDirection: 0 | 1 = 0;

  constructor(
    private productService: ApiService,
    private categoryService: ApiService,
    private contentService: contentService, // ← جديد
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. جلب بيانات الموقع أول حاجة
    this.loadSiteData();

    // 2. جلب الفئات والمنتجات
    this.loadCategories();
    this.loadFeaturedProducts();
  }

  // جلب بيانات الموقع (العنوان، اللوجو، الهيرو...)
  private loadSiteData(): void {
    this.siteLoading = true;
    this.contentService.getAdminData().subscribe({
      next: (data) => {
        this.siteData = data;
        this.siteLoading = false;
      },
      error: (err) => {
        console.error('Failed to load site settings:', err);
        this.siteData = {
          id: 1,
          title: 'متجر العوفي',
          description: 'قطع غيار ومكونات أصلية بأفضل الأسعار',
          logo: 'assets/images/default-logo.png', // fallback
          heroImage: 'assets/images/default-hero.jpg', // fallback
        };
        this.siteLoading = false;
      },
    });
  }

  // جلب الفئات
  loadCategories(): void {
    this.loading = true;
    const params: CategoryParams = { pageIndex: 1, pageSize: 100 };

    this.categoryService.getAllCategories(params).subscribe({
      next: (response) => {
        this.categories = response.data.map((cat: any) => ({
          ...cat,
          imagePublicId: cat.imagePublicId ?? '',
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.loading = false;
      },
    });
  }

  // جلب المنتجات المميزة (آخر 8 منتجات مثلاً)
  loadFeaturedProducts(): void {
    this.loading = true;
    const params: ProductParams = {
      pageIndex: 1,
      pageSize: 8,
      sortDirection: 1, // الأحدث أولًا
    };

    this.productService.getAllProducts(params).subscribe({
      next: (response) => {
        this.featuredProducts = response.data.map((p: Product) => ({
          ...p,
          status: p.status ?? '',
          brand: p.brand ?? '',
          model: p.model ?? '',
          createdAt: p.createdAt ?? '',
          productMedia: p.productMedia ?? [],
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading featured products:', err);
        this.loading = false;
      },
    });
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchQuery.trim() },
      });
      this.searchQuery = '';
    }
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating || 0)).fill(0);
  }
}
