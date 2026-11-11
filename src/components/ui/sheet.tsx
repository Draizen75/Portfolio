import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogOverlay, DialogPortal } from "@/components/ui/dialog";
const Sheet = DialogPrimitive.Root, SheetTrigger = DialogPrimitive.Trigger, SheetClose = DialogPrimitive.Close, SheetTitle = DialogPrimitive.Title, SheetDescription = DialogPrimitive.Description;
type Side = "top" | "right" | "bottom" | "left";
interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> { side?: Side; }
const sides: Record<Side,string> = { top:"inset-x-0 top-0 w-full border-b data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0", right:"inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=closed]:translate-x-full data-[state=open]:translate-x-0", bottom:"inset-x-0 bottom-0 w-full border-t data-[state=closed]:translate-y-full data-[state=open]:translate-y-0", left:"inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0" };
const SheetContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>,SheetContentProps>(({side="right",className,children,...props},ref)=><DialogPortal><DialogOverlay/><DialogPrimitive.Content ref={ref} className={cn("fixed z-50 gap-4 border-slate-200/70 bg-white/95 p-6 text-slate-900 shadow-xl backdrop-blur-xl transition-transform duration-300 ease-out dark:border-slate-800/70 dark:bg-slate-950/95 dark:text-white",sides[side],className)} {...props}>{children}<DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"><X className="h-4 w-4" aria-hidden="true"/><span className="sr-only">Close</span></DialogPrimitive.Close></DialogPrimitive.Content></DialogPortal>);
SheetContent.displayName=DialogPrimitive.Content.displayName;
export {Sheet,SheetTrigger,SheetClose,SheetContent,SheetTitle,SheetDescription};
