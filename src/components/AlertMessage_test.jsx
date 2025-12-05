import React from "react";

const AlertMessage = ({ 
    title, 
    message, 
    hint, 
    variant = "error", 
    children 
}) => {
    // Farbklassen je nach Variante
    const variants = {
        error: {
            base: "bg-red-50 border-l-4 border-red-400 text-red-800",
            hint: "text-red-700",
            role: "alert",
        },
        success: {
            base: "bg-green-50 border-l-4 border-green-400 text-green-800",
            hint: "text-green-700",
            role: "status",
        },
        warning: {
            base: "bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800",
            hint: "text-yellow-700",
            role: "alert",
        },
        info: {
            base: "bg-blue-50 border-l-4 border-blue-400 text-blue-800",
            hint: "text-blue-700",
            role: "status",
        },
    };

    const { base, hint: hintClass, role } = variants[variant] || variants.error;

    return (
        <div 
            className={`${base} p-6 rounded-r-xl text-center`} 
            role={role}
        >
            {title && (
                <strong className="font-bold text-xl block mb-2">{title}</strong>
            )}
            {message && (
                <span className="block text-lg">{message}</span>
            )}
            {hint && (
                <p className={`text-sm mt-3 ${hintClass}`}>{hint}</p>
            )}
            {children}
        </div>
    );
};

export default AlertMessage;