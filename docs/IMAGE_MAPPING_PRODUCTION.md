# Image Mapping - Production Guide

## Current Implementation

The automatic image mapping system uses a build-time script that scans `public/images/` folders and generates a TypeScript mapping file.

## Production Readiness ✅

### ✅ **Good for Production:**

1. **Build-time Generation**: Runs before build, no runtime overhead
2. **Type-safe**: Generates TypeScript with proper types
3. **Automatic**: No manual path entry needed
4. **CI/CD Compatible**: Works in all build environments
5. **Error Handling**: Improved script with proper error handling
6. **Vite Integration**: Integrated into Vite build process

### ⚠️ **Considerations:**

1. **Generated File**: The `imageMap.generated.ts` file should be:
   - **Option A (Recommended)**: Committed to git for consistency
   - **Option B**: Regenerated on each build (already set up)

2. **Build Process**: The script runs automatically via:
   - `predev` hook (before dev server)
   - `prebuild` hook (before production build)
   - Vite plugin (as backup)

3. **File System Access**: Requires Node.js file system access (available in all CI/CD environments)

## Recommendations

### ✅ **For Production:**

1. **Commit the generated file** (recommended):
   ```bash
   git add src/utils/imageMap.generated.ts
   git commit -m "Add generated image map"
   ```
   - Ensures consistency across environments
   - Faster builds (no regeneration needed)
   - Version controlled

2. **Or keep it in .gitignore** (if you prefer):
   - Add to `.gitignore`: `src/utils/imageMap.generated.ts`
   - Script will regenerate on each build
   - Slightly slower builds but always up-to-date

### 🔧 **CI/CD Setup:**

The build process already handles this automatically:

```yaml
# Example GitHub Actions
- name: Install dependencies
  run: npm ci

- name: Generate image map
  run: npm run generate:images  # Optional if using prebuild

- name: Build
  run: npm run build  # prebuild hook runs automatically
```

### 📦 **Deployment:**

The generated file is included in the build output, so no special deployment steps needed.

## Alternative: Vite Native Solution

If you want a more Vite-native approach, you could:

1. **Move images to `src/assets/images/`**
2. **Use `import.meta.glob`**:
   ```typescript
   const imageModules = import.meta.glob('/src/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}', {
     eager: true,
     as: 'url'
   });
   ```

However, this requires:
- Moving all images from `public/` to `src/assets/`
- Images would be processed by Vite (optimized, hashed)
- More complex path handling

## Current Approach is Production-Ready ✅

The current implementation is **production-ready** with:
- ✅ Proper error handling
- ✅ Automatic generation
- ✅ Build integration
- ✅ Type safety
- ✅ CI/CD compatible

Just ensure the generated file is either committed or regenerated on each build.

