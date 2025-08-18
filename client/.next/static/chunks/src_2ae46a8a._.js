(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/NavBar/NavBar.module.css [app-client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "burgerIcon": "NavBar-module__jvDvRq__burgerIcon",
  "navOpen": "NavBar-module__jvDvRq__navOpen",
  "navbar": "NavBar-module__jvDvRq__navbar",
  "navbarContent": "NavBar-module__jvDvRq__navbarContent",
  "navbarItem": "NavBar-module__jvDvRq__navbarItem",
  "navbarSearch": "NavBar-module__jvDvRq__navbarSearch",
  "searchContainer": "NavBar-module__jvDvRq__searchContainer",
  "searchDropdown": "NavBar-module__jvDvRq__searchDropdown",
  "searchDropdownItem": "NavBar-module__jvDvRq__searchDropdownItem",
});
}),
"[project]/src/context/AuthContext.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthContext": ()=>AuthContext,
    "AuthProvider": ()=>AuthProvider
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
const AuthProvider = (param)=>{
    let { children } = param;
    _s();
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSuperuser, setIsSuperuser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingUser, setLoadingUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const token = localStorage.getItem("accessToken");
            if (token) {
                setIsLoggedIn(true);
                fetch("http://127.0.0.1:8000/api/auth/protected/", {
                    headers: {
                        Authorization: "Bearer ".concat(token)
                    }
                }).then({
                    "AuthProvider.useEffect": (res)=>res.json()
                }["AuthProvider.useEffect"]).then({
                    "AuthProvider.useEffect": (data)=>{
                        // Access the user object inside data
                        setUser(data.user);
                        setIsSuperuser(data.user.is_superuser);
                    }
                }["AuthProvider.useEffect"]).catch({
                    "AuthProvider.useEffect": (err)=>console.error("Error fetching user:", err)
                }["AuthProvider.useEffect"]).finally({
                    "AuthProvider.useEffect": ()=>setLoadingUser(false)
                }["AuthProvider.useEffect"]);
            } else {
                setLoadingUser(false);
            }
        }
    }["AuthProvider.useEffect"], []);
    const login = (access, refresh)=>{
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        setIsLoggedIn(true);
        fetch("http://127.0.0.1:8000/api/auth/protected/", {
            headers: {
                Authorization: "Bearer ".concat(access)
            }
        }).then((res)=>res.json()).then((data)=>{
            setUser(data.user);
            setIsSuperuser(data.user.is_superuser);
        }).catch((err)=>console.error("Error fetching user after login:", err));
    };
    const logout = ()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
        setIsSuperuser(false);
        setUser(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            isLoggedIn,
            isSuperuser,
            login,
            logout,
            user,
            loadingUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.jsx",
        lineNumber: 59,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "OouX2+XG8OtITx8/ZOfo6QT3qJo=");
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/NavBar/NavBar.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/NavBar/NavBar.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const NavBar = ()=>{
    _s();
    const { isLoggedIn, isSuperuser, loadingUser, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthContext"]);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showDropdown, setShowDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // new state for burger menu
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavBar.useEffect": ()=>setMounted(true)
    }["NavBar.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavBar.useEffect": ()=>{
            if (!mounted) return;
            if (!query.trim()) {
                setResults([]);
                return;
            }
            const timeout = setTimeout({
                "NavBar.useEffect.timeout": ()=>{
                    fetch("http://127.0.0.1:8000/api/blog/posts/search/?query=".concat(encodeURIComponent(query))).then({
                        "NavBar.useEffect.timeout": (res)=>res.ok ? res.json() : Promise.reject(res.status)
                    }["NavBar.useEffect.timeout"]).then({
                        "NavBar.useEffect.timeout": (data)=>{
                            setResults(data);
                            setShowDropdown(true);
                        }
                    }["NavBar.useEffect.timeout"]).catch({
                        "NavBar.useEffect.timeout": (err)=>console.error("Search failed:", err)
                    }["NavBar.useEffect.timeout"]);
                }
            }["NavBar.useEffect.timeout"], 300);
            return ({
                "NavBar.useEffect": ()=>clearTimeout(timeout)
            })["NavBar.useEffect"];
        }
    }["NavBar.useEffect"], [
        query,
        mounted
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavBar.useEffect": ()=>{
            if (!mounted) return;
            const handleClickOutside = {
                "NavBar.useEffect.handleClickOutside": (e)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                        setShowDropdown(false);
                    }
                }
            }["NavBar.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "NavBar.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["NavBar.useEffect"];
        }
    }["NavBar.useEffect"], [
        mounted
    ]);
    const handleLogout = async ()=>{
        const token = localStorage.getItem("accessToken");
        try {
            await fetch("http://127.0.0.1:8000/api/auth/logout/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer ".concat(token)
                }
            });
        } catch (err) {
            console.error("Logout failed", err);
        }
        logout();
        router.push("/login");
    };
    const handleResultClick = (post)=>{
        const date = new Date(post.publish);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        router.push("/viewcontent/".concat(year, "/").concat(month, "/").concat(day, "/").concat(post.slug));
        setShowDropdown(false);
        setQuery("");
        setMenuOpen(false); // close menu after selecting
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbar,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].burgerIcon,
                onClick: ()=>setMenuOpen(!menuOpen),
                children: menuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaTimes"], {
                    size: 24
                }, void 0, false, {
                    fileName: "[project]/src/components/NavBar/NavBar.jsx",
                    lineNumber: 75,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaBars"], {
                    size: 24
                }, void 0, false, {
                    fileName: "[project]/src/components/NavBar/NavBar.jsx",
                    lineNumber: 75,
                    columnNumber: 45
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/NavBar/NavBar.jsx",
                lineNumber: 74,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbarContent, " ").concat(menuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navOpen : ""),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbarItem,
                        onClick: ()=>router.push("/"),
                        children: "Home"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NavBar/NavBar.jsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbarItem,
                        onClick: ()=>router.push("/creative-writing"),
                        children: "Creative Writing"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NavBar/NavBar.jsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbarItem,
                        onClick: ()=>router.push("/poems"),
                        children: "Poems"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NavBar/NavBar.jsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbarItem,
                        onClick: ()=>router.push("/short-stories"),
                        children: "Short Stories"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NavBar/NavBar.jsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbarItem,
                        onClick: ()=>router.push("/literary-analysis"),
                        children: "Literary Analysis"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NavBar/NavBar.jsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbarItem,
                        onClick: ()=>router.push("/entertainment"),
                        children: "Entertainment"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NavBar/NavBar.jsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    !loadingUser && isLoggedIn && isSuperuser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbarItem,
                        onClick: ()=>router.push("/add-post"),
                        children: "Add Post"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NavBar/NavBar.jsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NavBar/NavBar.jsx",
                lineNumber: 79,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchContainer,
                ref: dropdownRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "search",
                        placeholder: "Search posts...",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbarSearch,
                        value: query,
                        onChange: (e)=>setQuery(e.target.value),
                        onFocus: ()=>query && setShowDropdown(true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/NavBar/NavBar.jsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    showDropdown && results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchDropdown,
                        children: results.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchDropdownItem,
                                onClick: ()=>handleResultClick(post),
                                children: post.title
                            }, post.id, false, {
                                fileName: "[project]/src/components/NavBar/NavBar.jsx",
                                lineNumber: 106,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/NavBar/NavBar.jsx",
                        lineNumber: 104,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NavBar/NavBar.jsx",
                lineNumber: 94,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            !isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbarItem,
                onClick: ()=>router.push("/login"),
                children: "Log in"
            }, void 0, false, {
                fileName: "[project]/src/components/NavBar/NavBar.jsx",
                lineNumber: 120,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavBar$2f$NavBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbarItem,
                onClick: handleLogout,
                children: "Log out"
            }, void 0, false, {
                fileName: "[project]/src/components/NavBar/NavBar.jsx",
                lineNumber: 122,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NavBar/NavBar.jsx",
        lineNumber: 72,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(NavBar, "AEtURP/pK6I/kSmDW7KD1tgsNXk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = NavBar;
const __TURBOPACK__default__export__ = NavBar;
var _c;
__turbopack_context__.k.register(_c, "NavBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_2ae46a8a._.js.map