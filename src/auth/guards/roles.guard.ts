import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        //check if this handler has some roles label on it
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

        if(!requiredRoles){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const userRole = user?.role?.trim();

        const hasAccess = requiredRoles.includes(userRole);


        console.log("cleaned user role", "`${userRole}");
        console.log("Access Granted: ",hasAccess);

        //check if user role includes in the required roles list or not
        return hasAccess;
    }
}