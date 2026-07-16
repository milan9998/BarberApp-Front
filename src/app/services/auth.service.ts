import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { API_BASE_URL } from "../config/api.config";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = `${API_BASE_URL}/auth`;
    private roleKey = 'user_role';
    private owner_company_id = 'owner_company_id';
    private loggedIn = new BehaviorSubject<boolean>(this.checkStorage())
    isLoggedin$ =this.loggedIn.asObservable()

    constructor(private http: HttpClient) { }
    private checkStorage(): boolean{
        return !!localStorage.getItem("user_role")

    }
    login(formData: FormData): Observable<any> {
        return this.http.post<any>(`${this.authUrl}/login`, formData).pipe(
            tap(response => {
                if (!response) {
                    return;
                }
                const role = response.role ?? response.Role;
                if (!role) {
                    return;
                }
                localStorage.setItem(this.roleKey, role);
                // Persist company id BEFORE emitting logged-in so sidebar sees owner links immediately.
                const companyId =
                    response.companyIds?.[0] ??
                    response.CompanyIds?.[0] ??
                    response.companyId ??
                    response.CompanyId;
                if (companyId) {
                    this.setOwnerCompanyId(String(companyId));
                }
                this.loggedIn.next(true);
            })
        );
    }
    createCompanyOwner(formData: FormData):Observable<any>{
        return this.http.post<any>(`${this.authUrl}/createCompanyOwner`, formData)
    }

    register(formData : FormData):Observable<any>{
        return this.http.post<any>(`${this.authUrl}/register`, formData)
    }

    checkIfCompanyOwnerExists(id: string):Observable<any>{
        return this.http.get<any>(`${this.authUrl}/checkIfCompanyOwnerExists?CompanyId=${id}`)
    }

    getOwners(): Observable<any[]>{
        return this.http.get<any[]>(`${this.authUrl}/get-owners`)
    }

    logout(): void {
        //localStorage.removeItem(this.roleKey);
        localStorage.clear();
        this.loggedIn.next(false)
    }

    getRole(): string | null {
        return localStorage.getItem(this.roleKey);
    }

    isAdmin(): boolean {
        return this.getRole() === 'Admin';
    }

    isOwner(): boolean{
        return this.getRole() === 'CompanyOwner';
    }

    isBarber(): boolean {
        return this.getRole() === 'Barber';
    }

    setOwnerCompanyId(companyId: any) {
        if (companyId == null || companyId === '') {
            return;
        }
        localStorage.setItem(this.owner_company_id, String(companyId));
    }
    getOwnerCompanyId(): string | null {
       return localStorage.getItem(this.owner_company_id);
    }

    isLoggedIn(): boolean {
        return this.getRole() !== null;
    }

}